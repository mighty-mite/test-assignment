import { fetchCards } from "../store/cardsSlice";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./../store/store";
import Card from "../components/Card";
import { useEffect } from "react";
import { ICard } from "../utils/types";
import Filter from "../components/Filter";
import { Skeleton } from "@mui/material";
import error from "./../assets/error.gif";

export default function MainPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { filtered } = useSelector((state: RootState) => state.cards);
  const { cardsLoadingStatus } = useSelector((state: RootState) => state.cards);

  useEffect(() => {
    if (filtered.length === 0) dispatch(fetchCards());
  }, []);

  const renderCards = (arr: ICard[]) => {
    if (cardsLoadingStatus === "loading") {
      return Array.from({ length: 16 }).map((_, idx) => (
        <Skeleton key={idx} variant="rounded" width={305} height={122} />
      ));
    }

    if (cardsLoadingStatus === "error") {
      return <img src={error} alt="error" />;
    }

    return arr.map((card) => (
      <Card
        key={card.id}
        title={card.title}
        description={card.description}
        id={card.id}
      />
    ));
  };

  const content = renderCards(filtered);

  return (
    <section>
      <Filter />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: "15px",
        }}>
        {content}
      </div>
    </section>
  );
}
