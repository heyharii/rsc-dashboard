export async function getCarts() {
  const apiUrl = `https://dummyjson.com/carts`;

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

export async function getUsers() {
  const apiUrl = `https://dummyjson.com/users`;

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
