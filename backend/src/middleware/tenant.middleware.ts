import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { DataSource } from 'typeorm';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private dataSource: DataSource) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // Extract organization ID from JWT token or request headers
    // For now, we'll use a default organization ID for development
    const orgHeader = req.headers['x-organization-id'];
    let organizationId = '11111111-1111-1111-1111-111111111111';
    if (orgHeader) {
      organizationId = Array.isArray(orgHeader) ? orgHeader[0] : orgHeader;
    }

    // Set the organization ID in PostgreSQL session for RLS
    await this.dataSource.query(
      `SET app.current_organization_id = '${organizationId}'`,
    );

    // Attach to request for later use
    (req as { organizationId?: string }).organizationId = organizationId;

    next();
  }
}
