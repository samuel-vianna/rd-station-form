import Head from "next/head";
import axios from "axios";
import styles from "@/styles/Home.module.css";
import { Box, Button, Heading, Stack, Text, useToast } from "@chakra-ui/react";
import { CustomTextInputComponent } from "@/components/input/textInput";
import { HiPhone } from "react-icons/hi";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import formSchema from "@/data/schemas/form";
import { useState } from "react";

interface formProps {
  name: string;
  email: string;
  phone: string;
  verification: string;
}

export default function Home() {
  const toast = useToast({ duration: 3000, position: "top", isClosable: true });
  const [isFormSent, setIsFormSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const api = axios.create({ baseURL: "https://api.rd.services" });

  const toggleFormStatus = () => setIsFormSent((prev) => !prev);

  const onSubmit = async (data: formProps) => {
    try {
      setIsLoading(true);
      await api.request({
        url: `/platform/conversions?api_key=${process.env.NEXT_PUBLIC_TOKEN}`,
        method: "POST",
        data: {
          event_type: "CONVERSION",
          event_family: "CDP",
          payload: {
            conversion_identifier: "conversao_exemplo",
            email: data.email,
            name: data.name,
            personal_phone: data.phone,
          },
        },
      });

      toast({ title: "Cadastro realizado com sucesso!", status: "success" });
      toggleFormStatus();
      console.log(data);
    } catch (err) {
      toast({
        title: "Erro ao realizar cadastro.",
        description: "Se o erro persistir, por favor contate o suporte.",
        status: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Teste RD Station</title>
        <meta
          name="description"
          content="Teste para implementação da API da RD Station"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Heading textAlign="center">Teste RD Station</Heading>
        {isFormSent ? (
          <SuccessComponent onClick={toggleFormStatus} />
        ) : (
          <FormComponent isLoading={isLoading} onSubmit={onSubmit} />
        )}
      </main>
    </>
  );
}

// success component
export function SuccessComponent({ onClick }: { onClick: () => void }) {
  return (
    <Box mt={8} gap={2}>
      <Text align="center">
        Obrigado por se cadastrar! Em breve você receberá um email com mais
        informações.
      </Text>

      <Button w="100%" onClick={onClick} color="black" mt={8}>
        Cadastrar novamente
      </Button>
    </Box>
  );
}

// form component
export function FormComponent({
  isLoading,
  onSubmit,
}: {
  isLoading: boolean;
  onSubmit: (data: any) => void;
}) {
  const methods = useForm<formProps>({ resolver: yupResolver(formSchema) });
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Stack mt={8} gap={2}>
          <CustomTextInputComponent
            id="name"
            label="Nome"
            placeholder="Ex: João"
          />
          <CustomTextInputComponent
            id="email"
            label="Email"
            placeholder="Ex: teste@teste.com"
            type="email"
          />
          <CustomTextInputComponent
            id="phone"
            label="Telefone"
            placeholder="Ex: (44) 99999-9999"
            type="number"
            icon={<HiPhone />}
          />
        </Stack>
        <Button
          mt={8}
          w="100%"
          type="submit"
          color="black"
          isLoading={isLoading}
        >
          Enviar
        </Button>
      </form>
    </FormProvider>
  );
}
