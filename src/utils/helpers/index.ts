export function removeURLParams(paramsToRemove: string[] = []) {
  const url = new URL(window.location.href);
  const searchParams = url.searchParams;

  if (paramsToRemove.length === 0) {
    url.search = "";
  } else {
    paramsToRemove.forEach((param) => {
      searchParams.delete(param);
    });
    url.search = searchParams.toString();
  }

  window.history.pushState({}, "", url.toString());
}

export function pushURLParams(params: Record<string, string>) {
  const url = new URL(window.location.href);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  window.history.pushState({}, "", url.toString());
}
