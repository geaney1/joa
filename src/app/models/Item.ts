type Item = {
  id: number; // The item's unique id.
  deleted?: boolean; // true` if the item is deleted.
  type: 'job' | 'story' | 'comment' | 'poll' | 'pollopt';
  by?: string; // The username of the item's author.
  time?: number; //Creation date of the item, in Unix Time.
  dead?: boolean; // if the item is dead.
  kids?: Array<number>; //The ids of the item's comments, in ranked display order.
  descendants?: number; // in the case of stories or polls, the total comment count.
  score?: number; // The story's score, or the votes for a pollopt.
  title?: string; //The title of the story, poll or job
  url?: string; // The URL of the story
  parent?: number; // The item's parent. For comments, either another comment or the relevant story.                 //  For pollopts, the relevant poll
  text?: string; // The comment, story or poll text. HTML.
  parts?: Array<number>; //  A list of related pollopts, in display order.
};
export default Item;
