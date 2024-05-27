import './Classes.css';
export default function Classes() {
    const color = 'blue';
  return (
    <div>
      <h2>Classes</h2>
      <div className={`wd-bg-${color} wd-fg-black wd-padding-10px`}>
        Dynamic Blue background
      </div>
    </div> ) };


  