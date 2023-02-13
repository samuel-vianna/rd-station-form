import customYup from "@/utils/customYup";

const formSchema = customYup.object().shape({
  name: customYup.string().required(),
  email: customYup.string().required().email(),
  phone: customYup.string().required(),
  verification: customYup.string().required(),
});

export default formSchema;
