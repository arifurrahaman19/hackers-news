// import Lottie from "react-lottie";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Preloader = () => {
  return (
    <div className="fullpage-preloader">
      <div className="left-side">
        <Skeleton height={30} className="skeleton-1" count={1} />
        <Skeleton height={50} className="skeleton-2" count={1} />
      </div>
      <div className="right-side">
        <Skeleton className="skeleton-3" count={1} />
      </div>
    </div>
  );
};

export default Preloader;
