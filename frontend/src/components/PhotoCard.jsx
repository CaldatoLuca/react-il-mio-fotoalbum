import { useGlobal } from "../contexts/GlobalContext";

export default ({ title, image }) => {
  const { baseImgUrl } = useGlobal();
  return (
    <div className="shadow-2xl">
      <h3 className="text-center text-neutral-800 py-2 font-semibold ">
        {" "}
        {title}
      </h3>
      <figure className=" card-dash-img-container">
        <img src={baseImgUrl + image} alt={title} className="card-dash-img" />
      </figure>
    </div>
  );
};
