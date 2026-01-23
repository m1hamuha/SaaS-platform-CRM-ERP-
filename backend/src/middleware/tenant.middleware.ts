import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { DataSource } from 'typeorm';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private dataSource: DataSource) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      let organizationId: string | null = null;

      // Try to extract from Authorization header (JWT token)
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        try {
          const decoded = jwt.decode(token) as any;
          if (decoded && decoded.org_id) {
            organizationId = decoded.org_id;
          }
        } catch (error) {
          // Invalid token, continue with header check
        }
      }

      // Fallback to X-Organization-ID header (for development/testing)
      if (!organizationId) {
        const orgHeader = req.headers['x-organization-id'] || req.headers['x-tenant-id'];
        if (orgHeader) {
          organizationId = Array.isArray(orgHeader) ? orgHeader[0] : orgHeader;
        }
      }

      // If no organization ID found, throw unauthorized
      if (!organizationId) {
        throw new UnauthorizedException('Organization context required');
      }

      // Validate organization ID format (should be UUID)
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(organizationId)) {
        throw new UnauthorizedException('Invalid organization ID format');
      }

      // Set the organization ID in PostgreSQL session for RLS
      await this.dataSource.query(
        `SET app.current_organization_id = '${organizationId}'`,
      );

      // Attach to request for later use
      (req as { organizationId?: string }).organizationId = organizationId;

      next();
    } catch (error) {
      // If tenant middleware fails, return 401
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Invalid tenant context');
    }
  }
}
