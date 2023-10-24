const BASE_URL = "https://fakestoreapi.com";

const postData = async (path, data) => {
  try {
    const response = await fetch(`${BASE_URL}/${path}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    });
    const json = await response.json();
    return json;
  } catch {
    alert("An error occurd!");
  }
};

const getData = async (path) => {
  try {
    const response = await fetch(`${BASE_URL}/${path}`);
    const json = await response.json();
    return json;
  } catch {
    alert("An error occurd!");
  }
};

export { postData, getData };
