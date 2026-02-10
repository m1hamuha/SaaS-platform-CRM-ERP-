import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { DataSource } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  private readonly logger = new Logger(TenantMiddleware.name);

  constructor(
    private dataSource: DataSource,
    private configService: ConfigService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      let organizationId: string | null = null;

      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        try {
          const decoded = jwt.decode(token) as any;
          if (decoded && decoded.org_id) {
            organizationId = decoded.org_id;
          }
        } catch {
          this.logger.warn(
            'Failed to decode JWT token for organization extraction',
          );
        }
      }

      const enableHeaderBypass = this.configService.get<boolean>(
        'app.enableTenantHeaderBypass',
      );

      if (!organizationId && enableHeaderBypass) {
        const orgHeader =
          req.headers['x-organization-id'] || req.headers['x-tenant-id'];
        if (orgHeader) {
          const orgHeaderStr = Array.isArray(orgHeader)
            ? orgHeader[0]
            : orgHeader;
          organizationId = orgHeaderStr;
          this.logger.warn(
            `Tenant header bypass used: ${orgHeaderStr}. This should be disabled in production.`,
          );
        }
      }

      if (!organizationId) {
        throw new UnauthorizedException('Organization context required');
      }

      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(organizationId)) {
        throw new UnauthorizedException('Invalid organization ID format');
      }

      await this.dataSource.query(`SET app.current_organization_id = $1`, [
        organizationId,
      ]);

      (req as { organizationId?: string }).organizationId = organizationId;

      next();
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Invalid tenant context');
    }
  }
}
