import { Request, Response } from 'express';

export const success = function (
  data: any,
  totalRow?: number,
  metaData?: any,
  message?: string
) {
  if (data.data) {
    totalRow = data.totalRows || totalRow;
    metaData = data.metaData ? data.metaData : metaData;
    data = data.data || data;
  }
  return {
    success: true,
    errorCode: 0,
    message: message || '',
    data: data,
    totalRow: totalRow || 0,
    metaData: metaData,
  };
};

export const error = function (error: {
  message?: string;
  errorCode?: number;
}) {
  return {
    success: false,
    errorCode: error.errorCode || 0,
    message: error.message,
    data: null,
    totalRow: 0,
  };
};
