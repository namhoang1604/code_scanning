import { SetMetadata } from '@nestjs/common';

/**
 * The decorator to set the view class for the controller
 *
 * @param view The class for view
 * @returns The custom decorator
 */
export const View = (view: any) => SetMetadata('view', view);
