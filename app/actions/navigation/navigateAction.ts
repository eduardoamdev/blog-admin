"use server";

import { redirect } from "next/navigation";

export async function navigateAction(route: string) {
  redirect(route);
}
