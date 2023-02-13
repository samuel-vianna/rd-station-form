import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

interface props {
  label?: string;
  id: string;
  placeholder?: string;
  type?: string;
  onChange?: (value: any) => void;
  icon?: JSX.Element;
}

export function CustomTextInputComponent({
  label,
  id,
  placeholder,
  type = "text",
  icon,
  onChange,
}: props) {
  const {
    register,
    formState: { errors },
  } = useFormContext(); // retrieve those props

  const formattedLabel = id.replace(" ", "_").toLowerCase();
  const isInvalid = errors[formattedLabel] as boolean | undefined;

  return (
    <FormControl id={id} isInvalid={isInvalid}>
      <FormLabel htmlFor={formattedLabel} fontSize={"sm"}>
        {label}
      </FormLabel>
      <InputGroup>
        {icon && <InputRightElement pointerEvents="none" children={icon} />}
        <Input
          {...{ placeholder, type, onChange }}
          {...register(id, { required: true })}
        />
      </InputGroup>
      <FormErrorMessage>
        {errors[formattedLabel] && errors[formattedLabel]?.message?.toString()}
      </FormErrorMessage>
    </FormControl>
  );
}
