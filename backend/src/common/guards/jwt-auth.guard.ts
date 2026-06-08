import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt-user') {}

@Injectable()
export class JwtAdminGuard extends AuthGuard('jwt-admin') {
  handleRequest<T>(err: Error | null, admin: T, info: unknown, context: ExecutionContext): T {
    const result = super.handleRequest(err, admin, info, context) as T;
    const request = context.switchToHttp().getRequest();
    request.admin = result;
    return result;
  }
}
