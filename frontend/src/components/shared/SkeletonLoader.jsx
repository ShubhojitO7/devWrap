const SkeletonLoader = ({ type = 'card', count = 1 }) => {
  const items = Array.from({ length: count });

  const Card = () => (
    <div className="glass-card p-5 space-y-4">
      <div className="skeleton h-4 w-3/4 rounded" />
      <div className="skeleton h-3 w-full rounded" />
      <div className="skeleton h-3 w-5/6 rounded" />
      <div className="flex gap-3 mt-4">
        <div className="skeleton h-8 w-20 rounded-lg" />
        <div className="skeleton h-8 w-16 rounded-lg" />
      </div>
    </div>
  );

  const List = () => (
    <div className="space-y-3">
      {[1, 2, 3].map(i => (
        <div key={i} className="flex items-center gap-3 p-3">
          <div className="skeleton w-10 h-10 rounded-xl" />
          <div className="flex-1 space-y-2">
            <div className="skeleton h-3 w-3/4 rounded" />
            <div className="skeleton h-2 w-1/2 rounded" />
          </div>
          <div className="skeleton h-6 w-14 rounded-lg" />
        </div>
      ))}
    </div>
  );

  const Stat = () => (
    <div className="glass-card p-5 space-y-3">
      <div className="skeleton h-3 w-1/2 rounded" />
      <div className="skeleton h-8 w-2/3 rounded" />
      <div className="skeleton h-2 w-1/3 rounded" />
    </div>
  );

  const Chat = () => (
    <div className="space-y-4">
      <div className="flex gap-3">
        <div className="skeleton w-8 h-8 rounded-full" />
        <div className="skeleton h-16 w-3/4 rounded-2xl" />
      </div>
      <div className="flex gap-3 justify-end">
        <div className="skeleton h-10 w-1/2 rounded-2xl" />
      </div>
      <div className="flex gap-3">
        <div className="skeleton w-8 h-8 rounded-full" />
        <div className="skeleton h-24 w-3/4 rounded-2xl" />
      </div>
    </div>
  );

  const getComponent = () => {
    switch (type) {
      case 'list': return <List />;
      case 'stat': return <Stat />;
      case 'chat': return <Chat />;
      default: return <Card />;
    }
  };

  return (
    <div className="space-y-4">
      {items.map((_, i) => (
        <div key={i}>{getComponent()}</div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
