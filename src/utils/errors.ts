class Error400 extends Error {
  public statusCode: number;
  public data: any;

  constructor(error: Error) {
    super(error.message);

    this.statusCode = 400;
    this.data = { error };
  }
}

export const Error400Handler = (err: Error, next: any) =>
  next(new Error400(err));
