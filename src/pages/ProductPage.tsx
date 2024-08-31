import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ICard } from "../utils/types";
import useHttp from "../utils/useHttp";

export default function ProductPage() {
  const [card, setCard] = useState<ICard>();
  const { getSingleProduct } = useHttp();
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    getSingleProduct(id).then((data: ICard) => setCard(data));
  }, [getSingleProduct, id]);

  if (!card) return <span>no such card</span>;

  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      }}>
      <div>
        <img
          src={card.image}
          alt="product image"
          style={{ objectFit: "cover", maxWidth: "60%" }}
        />
      </div>
      <div>
        <h1 style={{ textAlign: "left" }}>{card.title}</h1>
        <h2 style={{ textAlign: "left" }}>Price: {card.price}$</h2>
        <p style={{ textAlign: "left" }}>{card.description}</p>
      </div>
    </section>
  );
}
