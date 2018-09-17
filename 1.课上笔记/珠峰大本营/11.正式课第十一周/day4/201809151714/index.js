import React from 'react';
import ReactDOM from 'react-dom';
import Vote from "./component/Vote";
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(<div>
    <Vote title='王伟常帅不帅？'/>
    <Vote title='尚晓琳能够找到18K的OFFER！'/>
    <Vote/>
</div>, window.root);

