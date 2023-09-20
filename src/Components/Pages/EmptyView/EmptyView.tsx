import "./EmptyView.css";

interface EmptyViewProps {
  msg: string;
}

function EmptyView(props: EmptyViewProps): JSX.Element {
  return (
    <div className="EmptyView">
      <h2>NO ITEMS FOUND</h2>
      <p>{props.msg}</p>
      <img
        src="https://giphy.com/clips/storyful-cat-animals-chess-95oDPmWBGhiZJZIGZZ"
        alt="EmptyView1"
      />
    </div>
  );
}

export default EmptyView;
