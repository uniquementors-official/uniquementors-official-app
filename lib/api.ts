import { NextResponse } from "next/server";

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

export function ok<T>(data: T, message?: string, init?: ResponseInit) {
  return NextResponse.json<ApiResponse<T>>({ success: true, data, message }, init);
}

export function fail(error: string, status = 400, message?: string) {
  return NextResponse.json<ApiResponse<never>>({ success: false, error, message }, { status });
}

export function parseSearchParams(url: string) {
  return new URL(url).searchParams;
}
