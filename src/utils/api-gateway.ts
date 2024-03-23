export const formatJSONResponse = (statusCode: number, response?: Record<string, unknown>) => {
  return {
    statusCode,
    ...(response && {body: JSON.stringify(response)})
  };
};
