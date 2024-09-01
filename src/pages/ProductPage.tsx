import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Skeleton } from "@mui/material";
import { ICard } from "../utils/types";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";

export default function ProductPage() {
  const [card, setCard] = useState<ICard>();
  const { filtered } = useSelector((state: RootState) => state.cards);
  const { id } = useParams();

  useEffect(() => {
    const target = filtered.find((item) => item.id === id);
    if (!target) return;
    setCard(target);
  }, []);

  return (
    <>
      {card ? (
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
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "20px",
            width: "100%",
          }}>
          <Skeleton variant="rounded" width={400} height={400} />
          <div style={{ width: "100%" }}>
            <Skeleton variant="text" sx={{ fontSize: "5rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "4rem" }} />
          </div>
        </div>
      )}
    </>
  );
}
