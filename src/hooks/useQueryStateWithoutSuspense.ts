import { useQueryState, UseQueryStateOptions } from "nuqs";

export const useQueryStateWithoutSuspense = ((
  key: string,
  options: UseQueryStateOptions<{}>
) => {
  try {
    return useQueryState(key, options);
  } catch (err) {
    if (
      String(err).includes(
        `Bail out to client-side rendering: useSearchParams()`
      )
    ) {
      return [null, () => {}] as never;
    }
    throw err;
  }
}) as typeof useQueryState;
