const makeQueryFromArray = (param: string, array: any[]): string => {
  let query = '';

  for (let i = 0; i < array.length; i++) {
    query += `&${param}[]=${array[i]}`;
  }

  return query.slice(1);
};

export const objectToQuerystring = (data: Record<string, any>): string => {
  let queryString = '';

  Object.keys(data).forEach((el) => {
    if (data[el] === undefined || data[el] === null) {
    } else if (Array.isArray(data[el])) {
      queryString += `&${makeQueryFromArray(el, data[el])}`;
    } else {
      queryString += `&${el}=${data[el]}`;
    }
  });

  return queryString.slice(1);
};
