type MockEndpoint<Args extends unknown[]> = (...args: Args) => Promise<Response>;

class APIClient<T, Args extends unknown[] = []> {
  endpoint: MockEndpoint<Args>;

  constructor(endpoint: MockEndpoint<Args>) {
    this.endpoint = endpoint;
  }

  request = async (...args: Args): Promise<T> => {
    const response = await this.endpoint(...args);
    if (!response.ok) {
      const body = await response.json().catch(() => null);
      throw new Error(
        body?.message ?? `Request failed with status ${response.status}`,
      );
    }
    return response.json();
  };
}

export default APIClient;
