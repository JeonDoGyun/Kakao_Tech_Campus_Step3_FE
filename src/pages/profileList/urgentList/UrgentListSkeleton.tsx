const UrgentListSkeleton = () => {
  return (
    <div className="mx-16 sm:mx-40 lg:mx-64 my-14">
      <h2 className="flex w-full font-bold text-xl sm:text-2xl items-center whitespace-nowrap">
        긴급 도움이 필요해요!
      </h2>
      <div className="grid grid-cols-1 gap-1 md:grid-cols-2 my-3 w-full whitespace-nowrap">
        <div className="w-64 h-28 bg-gray-200 m-2 flex items-center gap-6 ml-20" />
        <div className="w-64 h-28 bg-gray-200 m-2 flex items-center gap-6 ml-20" />
        <div className="w-64 h-28 bg-gray-200 m-2 flex items-center gap-6 ml-20" />
        <div className="w-64 h-28 bg-gray-200 m-2 flex items-center gap-6 ml-20" />
        <div className="w-64 h-28 bg-gray-200 m-2 flex items-center gap-6 ml-20" />
        <div className="w-64 h-28 bg-gray-200 m-2 flex items-center gap-6 ml-20" />
        <div className="w-64 h-28 bg-gray-200 m-2 flex items-center gap-6 ml-20" />
        <div className="w-64 h-28 bg-gray-200 m-2 flex items-center gap-6 ml-20" />
      </div>
      <div className="flex justify-center mb-11 sm:mb-28"></div>
    </div>
  );
};

export default UrgentListSkeleton;
