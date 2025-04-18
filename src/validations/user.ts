import { object, string } from "zod";
export const registerSchema = object({
  name: string().min(1, "名前は必須です"),
  email: string({required_error: "メールアドレスは必須です"})
    .min(1, "メールアドレスは必須です")
    .email("メールアドレスの形式が正しくありません"),
  password: string({required_error: "パスワードは必須です"})
    .min(1, "パスワードは必須です")
    .min(8, "パスワードは8文字以上である必要があります")
    .max(32, "パスワードは32文字以下である必要があります"),
  confirmPassword: string({required_error: "パスワード確認は必須です"})
    .min(1, "パスワード確認は必須です")
}).refine((data) => data.password === data.confirmPassword, {
  message: "パスワードが一致しません",
  path: ["confirmPassword"]
});