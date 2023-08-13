export async function getProducts({
  q = "",
}: {
  q?: string;
} = {}) {
  let apiUrl: string;

  if (q.trim() === "") {
    apiUrl = "https://dummyjson.com/products?limit=0";
  } else {
    const queryParams = new URLSearchParams({
      q,
    });
    apiUrl = `https://dummyjson.com/products/search?${queryParams}?limit=0`;
  }

  const res = await fetch(apiUrl);

  if (!res.ok) {
    if (res.status === 404) {
      return {
        payload: null,
        error: "NotFoundError",
      };
    }

    return {
      payload: null,
      error: "GeneralError",
    };
  }

  try {
    const payload = await res.json();

    return { payload, error: null };
  } catch (err) {
    console.error(err);

    return { payload: null, error: "InvalidFormatError" };
  }
}

export async function getCategories() {
  const apiUrl = `https://dummyjson.com/products/categories`;
  const res = await fetch(apiUrl);

  if (!res.ok) {
    if (res.status === 404) {
      return {
        payload: null,
        error: 'NotFoundError',
      };
    }

    return {
      payload: null,
      error: 'GeneralError',
    };
  }

  try {
    const payload = await res.json();

    return { payload, error: null };
  } catch (err) {
    console.error(err);

    return { payload: null, error: 'InvalidFormatError' };
  }
}
