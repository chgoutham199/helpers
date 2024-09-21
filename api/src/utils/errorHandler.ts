export const errorHandler = (statusCode :any ,message : any) => {

      const error:any = new Error();
      error.statusCode=statusCode;
      error.message=message;

};