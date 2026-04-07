import z from "zod";


const passwordValidation = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
)
export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().regex(passwordValidation,{
       message: 'Password must contain at least 8 characters, 1 upper, 1 lower, 1 digit, 1 special'
    }),
   
});
export type RegisterSchema = z.infer<typeof registerSchema>;