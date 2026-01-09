import { zodResolver } from "@hookform/resolvers/zod";
import type { UseFormProps } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { z } from "zod";

type UseAppFormProps<TSchema extends z.ZodType> = Omit<
  UseFormProps<z.input<TSchema>>,
  "resolver"
> & {
  schema: TSchema;
};

export function useAppForm<TSchema extends z.ZodType>({
  schema,
  ...formProps
}: UseAppFormProps<TSchema>) {
  return useForm<z.input<TSchema>>({
    ...formProps,
    resolver: zodResolver(schema),
  });
}
