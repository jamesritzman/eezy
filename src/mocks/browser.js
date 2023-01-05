import { setupWorker } from 'msw';
import { restHandlers } from '../../tests/setup';

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...restHandlers);
