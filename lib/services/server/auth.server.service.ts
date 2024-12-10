import xss from "xss";

const formDataToUserDTO = (formData: FormData): IUserDtoCreate => {
  const email = xss(formData.get("email")?.toString() || "");
  const password = xss(formData.get("password")?.toString() || "");
  const firstName = xss(formData.get("firstName")?.toString() || "");
  const lastName = xss(formData.get("lastName")?.toString() || "");
  const imgUrl = xss(formData.get("imgUrl")?.toString() || "");
  const googleId = xss(formData.get("googleId")?.toString() || "");
  const returnedData: IUserDtoCreate = {
    email,
    password,
    firstName,
    lastName,
    imgUrl: imgUrl || "/imgs/avatarDefault.svg",
    googleId,
  };

  return returnedData;
};

const getEmpty = (): IUser => {
  return {
    email: "",
    firstName: "",
    _id: "",
    imgUrl: "",
    lastName: "",
  };
};

export const authServerService = {
  formDataToUserDTO,
  getEmpty,
};
