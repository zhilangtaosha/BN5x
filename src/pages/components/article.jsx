import React, { Component } from 'react';
import C from '../../constants';

class Article extends Component {
	constructor() {
		super();
		this.submit = this.submit.bind(this);
    this.tomatoPlue = this.tomatoPlue.bind(this);
	}
	submit(e) {
		this.props.submit(this.refs.field.value);
		this.refs.field.value = '';
		e.preventDefault();
	}

  tomatoPlue(e){
    console.log('this.refs:', this.refs)
    this.props.test({a:this.refs.content.innerText, b:parseInt(this.refs.tomato.innerText)})
		e.preventDefault();
  }

	render() {
		const p = this.props;
		let button;
		if (p.state === C.EDITING_ARTICLE) {
			return (<form className="article" onSubmit={this.submit}>
				<input ref="field" defaultValue={p.article.content}/>
				<button type="button" onClick={p.cancel}>Cancel</button>
				<button type="submit" onClick={this.submit}>Submit</button>
			</form>);
		}
		if (!p.mayedit) {
			button = '';
		} else if (p.state === C.SUBMITTING_ARTICLE) {
			button = <button disabled="disabled">Submitting...</button>;
		} else {
			button = <span><button onClick={p.edit}>Edit</button><button onClick={p.delete}>Delete</button></span>;
		}



    let tomatoButton =(
      <span>
        <button onClick={this.tomatoPlue}>+</button>
        <button>-</button>
      </span>
    )


		return (
			<div className="article">
				<span className="author">{p.article.username + ' said: '}</span>
				<span ref="content" >{p.article.content}</span> {button} 
        <span ref="tomato">{p.article.tomato_total}</span> {' '}  {tomatoButton} {p.article.tomato_passed}
			</div>
		);
	}
}

export default Article;
