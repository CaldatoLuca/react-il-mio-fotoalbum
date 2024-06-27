import { useGlobal } from "../../contexts/GlobalContext";

export default ({ title, image, categories }) => {
  const { baseImgUrl } = useGlobal();

  return (
    <div className=" col-span-1 shadow-2xl">
      <h3>{title}</h3>
      <figure>
        <img src={`${baseImgUrl}${image}`} alt="" />
      </figure>
    </div>
  );
};
