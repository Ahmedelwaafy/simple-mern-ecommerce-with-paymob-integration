import useWindowSize from "@/Hooks/useWindowSize";
import { cn } from "@/lib/utils";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router-dom";

type PaginationProps = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  lastPage: number | string;
  className?: string;
};
function Pagination({
  page,
  lastPage,
  setPage,
  className = "w-full",
}: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const { width } = useWindowSize();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [page]);
  const previousPage = useCallback(() => {
    setPage((prev) => +prev - 1);

    setSearchParams(
      (params) => {
        params.set("page", String(page - 1));
        return params;
      },
      { replace: true }
    );
  }, [setSearchParams]);

  const NextPage = () => {
    setPage((prev) => +prev + 1);

    setSearchParams(
      (params) => {
        params.set("page", String(page + 1));
        return params;
      },
      { replace: true }
    );
  };

  const PaginationChange = useCallback(
    (e: any) => {
      setPage(Number(e.selected) + 1);

      setSearchParams(
        (params) => {
          params.set("page", String(Number(e.selected) + 1));
          return params;
        },
        { replace: true }
      );
    },
    [setPage, setSearchParams]
  );
  if (+lastPage <= 1) {
    return;
  }
  return (
    <nav
      className={cn(
        `all__properties--pagination trns  flex justify-between items-center my-16`,
        className
      )}
    >
      <div
        className={`w-fit ${page <= 1 && "cursor-not-allowed"} ${
          +lastPage > 1 ? "block" : "hidden"
        }`}
      >
        <button
          disabled={page <= 1}
          className=" w-[50px] aspect-square text-lg rounded-xs bg- trns bg-accent disabled:opacity-50 disabled:pointer-events-none hover:opacity-80"
          onClick={previousPage}
        >
          <FontAwesomeIcon
            className="rotate-180 rtl:rotate-0"
            icon={faAnglesRight}
          />
        </button>
      </div>
      <ReactPaginate
        previousLinkClassName="pagination__previous"
        nextLinkClassName="pagination__next"
        breakLabel="..."
        pageCount={Number(lastPage)}
        onPageChange={(e) => PaginationChange(e)}
        marginPagesDisplayed={width && width > 1200 ? 3 : 1}
        pageRangeDisplayed={width && width > 1200 ? 5 : 1}
        renderOnZeroPageCount={null}
        containerClassName="pagination__wrapper"
        activeClassName="active__page--pagination"
        forcePage={+page - 1}
      />
      <div
        className={`w-fit ${page >= +lastPage && "cursor-not-allowed"} ${
          +lastPage > 1 ? "block" : "hidden"
        }`}
      >
        <button
          disabled={page >= +lastPage}
          className=" w-[50px] aspect-square text-lg rounded-xs bg- trns bg-accent disabled:opacity-50 disabled:pointer-events-none hover:opacity-80"
          onClick={NextPage}
        >
          <FontAwesomeIcon className="rtl:rotate-180 " icon={faAnglesRight} />
        </button>
      </div>
    </nav>
  );
}
export default Pagination;
