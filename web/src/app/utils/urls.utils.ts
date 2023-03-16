import { API_ENDPOINTS } from '@src/constants/api.constant';
import { environment } from '@src/environments/environment';

/**
 * Get absolute URL from current one
 *
 * @param paths relative paths to apply on current URL
 */
export const absolutePath = (paths: string[]) => {
  const link = document.createElement('a');
  link.href = paths.join('/');
  const url = link.href;
  link.remove();
  return url;
};

/**
 * Get root URL of redirection endpoint
 *
 * @returns
 */
export const redirectUrlRoot = () =>
  absolutePath([environment.api, API_ENDPOINTS.urls.redirect]);

/**
 * Copy the given text into user clipboard
 *
 * @param text
 * @param callback
 */
export const copyToClipboard = (
  text: string,
  callback: (err?: any) => void
) => {
  navigator.clipboard
    .writeText(text)
    .then(() => callback())
    .catch((e) => {
      console.error(e);
      callback(e);
    });
};
