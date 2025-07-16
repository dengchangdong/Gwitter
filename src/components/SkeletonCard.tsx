const SkeletonCard = () => {
  // 骨架屏动画类
  const skeletonClass = "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded";
  
  return (
    <div className="relative mb-2 flex rounded-lg">
      <div className="relative z-10 m-1.5 flex-1 overflow-hidden rounded-lg border border-gray-100 bg-white/80 p-5 shadow-sm">
        {/* 头部 */}
        <div className="relative mb-3 flex items-center">
          {/* 头像 */}
          <div className={`${skeletonClass} mr-2 h-8 w-8 rounded-full`}></div>
          {/* 用户名 */}
          <div className={`${skeletonClass} h-5 w-28`}></div>
          {/* 日期 */}
          <div className={`${skeletonClass} ml-5 h-4 w-20`}></div>
          {/* 标签 */}
          <div className={`${skeletonClass} absolute right-0 top-0 h-6 w-14`}></div>
        </div>
        
        {/* 内容 */}
        <div className="mb-4">
          <div className={`${skeletonClass} mt-3 h-4 w-[95%]`}></div>
          <div className={`${skeletonClass} mt-3 h-4 w-[85%]`}></div>
          <div className={`${skeletonClass} mt-3 h-4 w-[75%]`}></div>
          <div className={`${skeletonClass} mt-3 h-4 w-[65%]`}></div>
        </div>
        
        {/* 底部 */}
        <div className="relative mt-4">
          <div className={`${skeletonClass} h-5 w-24`}></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
