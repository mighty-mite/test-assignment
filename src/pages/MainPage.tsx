import { fetchCards } from "../store/cardsSlice";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./../store/store";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import { ICard } from "../utils/types";
import Filter from "../components/Filter";
import { Pagination, Skeleton } from "@mui/material";
import error from "./../assets/error.gif";

const CARDS_PER_PAGE = 16;

export default function MainPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { filtered } = useSelector((state: RootState) => state.cards);
  const { cardsLoadingStatus } = useSelector((state: RootState) => state.cards);

  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
  const endIndex = startIndex + CARDS_PER_PAGE;

  const paginatedCards = filtered.slice(startIndex, endIndex);

  useEffect(() => {
    if (filtered.length === 0) dispatch(fetchCards());
  }, []);

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const renderCards = (arr: ICard[]) => {
    if (cardsLoadingStatus === "loading") {
      return Array.from({ length: CARDS_PER_PAGE }).map((_, idx) => (
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

  const content = renderCards(paginatedCards);

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        minHeight: "calc(100vh - 64px)",
      }}>
      <div>
        <Filter changePage={() => setCurrentPage(1)} />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: "15px",
            paddingBottom: "15px",
          }}>
          {content}
        </div>
      </div>

      <Pagination
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
        count={Math.ceil(filtered.length / CARDS_PER_PAGE)}
        size="large"
        variant="outlined"
        color="primary"
        shape="rounded"
        page={currentPage}
        onChange={handlePageChange}
      />
    </section>
  );
}
