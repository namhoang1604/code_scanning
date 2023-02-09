import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { instanceToPlain } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The interceptor for view to handle and wrap up the response for the controller
 */
export class ViewInterceptor implements NestInterceptor {
  /**
   * The constructor for the view interceptor
   *
   * @param reflector The reflector of Nest
   */
  constructor(private reflector: Reflector) {}

  /**
   * To intercept the response to construct the response from View
   *
   * @param context The context from the request
   * @param next The call handler for the response
   * @returns The observable of response
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const view = this.reflector.get<any>('view', context.getHandler());

    if (!view) {
      return next.handle();
    }

    return next.handle().pipe(
      map((data) => {
        const viewInstance = new view(data.result);
        return {
          statusCode: context.switchToHttp().getResponse().statusCode,
          message: data.message,
          data: instanceToPlain(viewInstance),
        };
      }),
    );
  }
}
