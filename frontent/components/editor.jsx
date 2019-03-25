import React, { Component } from 'react'

import {
	connect
} from 'react-redux'


class Iselect extends Component {

	constructor(props) {
		super(props)

		this.state = {
			opened: false,
			value: '',
			text: '正文'
		}

		this.timeout;

		//ES6 类中函数必须手动绑定
		this.handleClick = this.handleClick.bind(this)
		this.selectEvent = this.selectEvent.bind(this)
		this.mouseupCallback = this.mouseupCallback.bind(this)

		document.addEventListener('mouseup', this.mouseupCallback)
	}

	componentWillMount() {
		document.addEventListener('mouseup', this.mouseupCallback)
    }

	componentWillUnmount() {
		document.removeEventListener('mouseup', this.mouseupCallback)
	}

	handleClick(event) {
		this.setState({
			opened: !this.state.opened
		})
	}

	mouseupCallback(e) {
		this.setState({
			opened: false
		})
	}

	mouseupEvent(event) {
		event.nativeEvent.stopImmediatePropagation()
		event.stopPropagation()
	}

	selectEvent(event) {

		let target = event.target

		if (target.tagName === "LI") {

			let value = target.getAttribute('data-val')

			this.setState({
				opened: false,
				value,
				text: event.target.textContent
			})

			this.props.onChange(value)
		}
	}

	render() {
		const {name, className, value} = this.props

        return (
			<div className={ 'iselect iselect-nosearch ' + className + (this.state.opened ? ' open' : '')} onMouseUp={this.mouseupEvent}>
				<input name={name} type="hidden" value={this.state.value} ref='inputSelect' />
				<div className="iselect-handle" onClick={this.handleClick}></div>
				<div className="iselect-value" onClick={this.handleClick}>{this.state.text}</div>
				<ul onClick={this.selectEvent}>{this.props.children}</ul>
			</div>
        );
    }

}


class ContentEditable extends Component {

	constructor(props) {
		super(props)

		//ES6 类中函数必须手动绑定
		this.emitChange = this.emitChange.bind(this)
	}

	shouldComponentUpdate(nextProps) {
	    return nextProps.html !== this.refs.contenteditable.innerHTML
	}

	componentDidUpdate() {
	    if ( this.props.html !== this.refs.contenteditable.innerHTML ) {
	       this.refs.contenteditable.innerHTML = this.props.html
	    }
	}

	emitChange() {
	    var html = this.refs.contenteditable.innerHTML;
	    if (this.props.onChange && html !== this.lastHtml) {
	        this.props.onChange({
	            target: {
	                value: html
	            }
	        });
	    }
	    this.lastHtml = html
	}

	render() {
	    return (
			<div id="contenteditable"
				ref = "contenteditable"
				className = {this.props.className}
		        onInput = {this.emitChange}
		        onBlur = {this.emitChange}
		        contentEditable = {true}
		        dangerouslySetInnerHTML={{__html: this.props.html}}>
			</div>
		)
	}
}


export class Editor extends Component {

	constructor(props) {
		super(props)

		this.state = {
			tab: 1,
			content: ''
		}

		//ES6 类中函数必须手动绑定
		this.handleChange = this.handleChange.bind(this)

	}

	componentWillMount() {
		this.setState({
			content: this.props.value
		})

    }

	componentDidMount() {
		document.getElementById('cccc').innerHTML = '<button type="butt" id="bbb">B</button><div className="editor-text" contenteditable><h2>这是标题</h2><p>梦想天空博客关注前端开发技术，分享各种增强网站用户体验的 jQuery 插件，展示前沿的 HTML5 和 CSS3 技术应用，推荐优秀的网页设计案例，共享精美的设计素材和优秀的 Web 开发工具，希望这些精心--</p></div>';
		//console.log("aa", document.getElementById('bolde'), this.refs.bolderef);
		document.getElementById('bbb').addEventListener('click', function(){
			let aa = document.execCommand('bold', false, null);
			console.log(aa);
		});
	}

	componentWillUnmount() {

	}

	handleChange(event) {
		this.setState({
			content: event.target.value
		})
	}

	boldExecCommand() {
		let aa = document.execCommand('bold', false, null);
		console.log(aa);
	}

	selectChange(value) {
		document.execCommand('heading', false, 'H2');
		console.log(value);
		// switch (value) {
		// 	case "h2":
		// 		document.execCommand('heading', false, 'H2')
		// 		console.log(value);
		// 		break;
		// 	case "h3":
		// 		document.execCommand('heading', false, 'H3')
		// 		break;
		// 	case "h4":
		// 		document.execCommand('heading', false, 'H4')
		// 		break;
		// 	case "div":
		// 		document.execCommand('heading', false, null)
		// 		break;
		// 	default:
		// }
	}


	render() {
		const {name, value} = this.props

        return (
			<div className="editor-box">
				<input type="hidden" name={name} value={this.state.content} />
				<div className="editor-box-head">
					<span className="active">文本</span>
					<span>Markdown</span>
				</div>
				<div className="editor-main">
					<div className="editor-head">
						<div className="editor-addons row">
							<Iselect name="ou_id" value={1} onChange={this.selectChange} className="iselect-little editor-style-select">
								<li className="editor-style-h2" data-val="h2">大标题</li>
								<li className="editor-style-h3" data-val="h3">小标题</li>
								<li className="editor-style-h4" data-val="h4">小标题 2</li>
								<li className="editor-style-p" data-val="div">正文</li>
							</Iselect><span className="editor-btn" ref="bolderef" id="bolde"><svg className="edit-svg" fill="currentColor" viewBox="0 0 26 26" width="24" height="24"><path d="M9 17.025V13h4.418c1.19 0 2.415.562 2.415 2.012s-1.608 2.013-2.9 2.013H9zM9 7h4.336c1 0 1.814.888 1.814 2 0 .89-.814 2-1.814 2H9V7zm8.192 1.899a3.893 3.893 0 0 0-3.888-3.889S9.334 5 8.167 5C7 5 7 6.167 7 6.167v11.666C7 19 8.167 19 8.167 19l5.572.01c2.333 0 4.231-1.86 4.231-4.148a4.122 4.122 0 0 0-1.77-3.372 3.873 3.873 0 0 0 .992-2.591z" fillRule="evenodd"></path></svg></span>
							<span className="editor-btn"><svg className="edit-svg" fill="currentColor" viewBox="0 0 26 26" width="24" height="24"><path d="M15.751 5h-5.502a.751.751 0 0 0-.749.75c0 .417.336.75.749.75H12l-2 11H8.249a.751.751 0 0 0-.749.75c0 .417.336.75.749.75h5.502a.751.751 0 0 0 .749-.75.748.748 0 0 0-.749-.75H12l2-11h1.751a.751.751 0 0 0 .749-.75.748.748 0 0 0-.749-.75" fillRule="evenodd"></path></svg></span>
							<span className="editor-btn"><svg className="edit-svg" fill="currentColor" viewBox="0 0 26 26" width="24" height="24"><path d="M17.975 12.209c.504.454.822 1.05.952 1.792.061.35.055.715-.022 1.096-.075.379-.209.718-.4 1.018-.465.73-1.155 1.175-2.07 1.337-.874.153-1.684-.06-2.432-.638a3.6 3.6 0 0 1-.916-1.043 3.92 3.92 0 0 1-.506-1.336c-.172-.98-.03-2.026.425-3.142.455-1.116 1.155-2.118 2.1-3.007.8-.757 1.456-1.182 1.97-1.273a.72.72 0 0 1 .544.104.656.656 0 0 1 .286.452c.054.31-.095.601-.45.877-.856.67-1.455 1.27-1.796 1.798-.323.513-.467.873-.43 1.079.034.196.21.287.524.274l.191-.001.249-.029a2.436 2.436 0 0 1 1.781.642zm-7.51 0c.504.454.821 1.05.951 1.792.062.35.056.715-.02 1.096-.077.379-.21.718-.401 1.018-.465.73-1.155 1.175-2.07 1.337-.874.153-1.684-.06-2.432-.638a3.6 3.6 0 0 1-.916-1.043 3.92 3.92 0 0 1-.506-1.336c-.172-.98-.03-2.026.424-3.142.455-1.116 1.156-2.118 2.101-3.007.8-.757 1.456-1.182 1.97-1.273a.72.72 0 0 1 .544.104.656.656 0 0 1 .285.452c.055.31-.094.601-.45.877-.855.67-1.454 1.27-1.796 1.798-.322.513-.466.873-.43 1.079.034.196.21.287.525.274l.191-.001.248-.029a2.436 2.436 0 0 1 1.782.642z" fillRule="evenodd"></path></svg></span>
							<span className="editor-btn"><svg className="edit-svg" fill="currentColor" viewBox="0 0 26 26" width="24" height="24"><path d="M19.718 11.559a.961.961 0 0 1 .007 1.352l-2.201 2.033-1.319 1.219a.937.937 0 0 1-1.33-.005.961.961 0 0 1-.001-1.345l2.813-2.576-2.804-2.568a.96.96 0 0 1-.008-1.352.963.963 0 0 1 1.337 0l2.475 2.289 1.031.953zm-7.462-5.567a1.001 1.001 0 0 1 1.16-.818c.544.096.907.616.81 1.165l-2.082 11.804a1.001 1.001 0 0 1-1.16.818 1.003 1.003 0 0 1-.81-1.165l2.082-11.804zM9.123 8.316a.96.96 0 0 1 0 1.345l-2.812 2.575 2.806 2.569a.962.962 0 0 1 .006 1.35.935.935 0 0 1-1.337 0l-2.093-1.934-1.412-1.305a.961.961 0 0 1-.007-1.352l2.833-2.62.685-.634c.345-.35.976-.354 1.331.006z" fillRule="evenodd"></path></svg></span>
							<span className="editor-btn"><svg className="edit-svg" fill="currentColor" viewBox="0 0 26 26" width="24" height="24"><path d="M9 6.5c0-.552.456-1 .995-1h8.01c.55 0 .995.444.995 1 0 .552-.456 1-.995 1h-8.01A.995.995 0 0 1 9 6.5zM5.884 7.893v-2.09h-.643L5.402 5h1.285v2.893h-.803zm.898 3.83l-.393.395h.862v.733H5v-.482l1.057-.892c.371-.312.461-.434.463-.566.003-.202-.135-.368-.396-.368-.289 0-.418.206-.418.43H5c0-.642.482-1.073 1.125-1.073s1.125.457 1.125.945c0 .307-.106.516-.468.877zM9 11.5c0-.552.456-1 .995-1h8.01c.55 0 .995.444.995 1 0 .552-.456 1-.995 1h-8.01a.995.995 0 0 1-.995-1zm0 5c0-.552.456-1 .995-1h8.01c.55 0 .995.444.995 1 0 .552-.456 1-.995 1h-8.01a.995.995 0 0 1-.995-1zm-1.759.624c0 .14-.025.27-.076.388a.902.902 0 0 1-.217.309 1.017 1.017 0 0 1-.336.205c-.13.05-.275.074-.437.074-.166 0-.32-.027-.462-.08a1.166 1.166 0 0 1-.367-.217 1.062 1.062 0 0 1-.246-.318.914.914 0 0 1-.1-.38v-.055h.765v.054a.343.343 0 0 0 .367.352c.117 0 .207-.03.27-.09.062-.06.093-.152.093-.277 0-.117-.039-.206-.117-.268a.506.506 0 0 0-.32-.091h-.14v-.516h.144c.117 0 .205-.03.264-.09a.31.31 0 0 0 .087-.226.27.27 0 0 0-.087-.209.332.332 0 0 0-.233-.08c-.107 0-.185.027-.236.08a.275.275 0 0 0-.076.197v.055h-.695v-.055a.915.915 0 0 1 .295-.644c.178-.161.436-.242.775-.242.14 0 .27.021.39.064s.224.102.312.176a.802.802 0 0 1 .207.262c.05.1.075.206.075.318 0 .258-.116.46-.348.605v.008a.625.625 0 0 1 .193.119.777.777 0 0 1 .256.572z" fillRule="evenodd"></path></svg></span>
							<span className="editor-btn"><svg className="edit-svg" fill="currentColor" viewBox="0 0 26 26" width="24" height="24"><path d="M9 7c0-.552.456-1 .995-1h8.01c.55 0 .995.444.995 1 0 .552-.456 1-.995 1h-8.01A.995.995 0 0 1 9 7zM6 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm3-6c0-.552.456-1 .995-1h8.01c.55 0 .995.444.995 1 0 .552-.456 1-.995 1h-8.01A.995.995 0 0 1 9 12zm0 5c0-.552.456-1 .995-1h8.01c.55 0 .995.444.995 1 0 .552-.456 1-.995 1h-8.01A.995.995 0 0 1 9 17z" fillRule="evenodd"></path></svg></span>
							<span className="editor-btn"><svg className="edit-svg" fill="currentColor" viewBox="0 0 26 26" width="24" height="24"><path d="M6.77 17.23c-.905-.904-.94-2.333-.08-3.193l3.059-3.06-1.192-1.19-3.059 3.058c-1.489 1.489-1.427 3.954.138 5.519s4.03 1.627 5.519.138l3.059-3.059-1.192-1.192-3.059 3.06c-.86.86-2.289.824-3.193-.08zm3.016-8.673l1.192 1.192 3.059-3.06c.86-.86 2.289-.824 3.193.08.905.905.94 2.334.08 3.194l-3.059 3.06 1.192 1.19 3.059-3.058c1.489-1.489 1.427-3.954-.138-5.519s-4.03-1.627-5.519-.138L9.786 8.557zm-1.023 6.68c.33.33.863.343 1.177.029l5.34-5.34c.314-.314.3-.846-.03-1.176-.33-.33-.862-.344-1.176-.03l-5.34 5.34c-.314.314-.3.846.03 1.177z" fillRule="evenodd"></path></svg></span>
							<span className="editor-btn"><svg className="edit-svg" fill="currentColor" viewBox="0 0 26 26" width="24" height="24"><path d="M21 17.444C21 18.3 20.1 19 19 19H5c-1.1 0-2-.7-2-1.556V6.556C3 5.7 3.9 5 5 5h14c1.1 0 2 .7 2 1.556v10.888zm-9.437-3.919a.5.5 0 0 1-.862.013l-1.26-2.065a.5.5 0 0 0-.861.012l-2.153 3.767a.5.5 0 0 0 .435.748h10.292a.5.5 0 0 0 .438-.741L14.573 9.78a.5.5 0 0 0-.872-.006l-2.138 3.75z" fillRule="evenodd"></path></svg></span>
							<span className="editor-btn"><svg className="edit-svg" fill="currentColor" viewBox="0 0 26 26" width="24" height="24"><path d="M10.546 15c-.466.273-.86.053-.86-.5V9.505c0-.565.385-.778.86-.501l4.278 2.497c.466.272.475.726 0 1.003L10.546 15zM5 5S3 5 3 7v10s0 2 2.002 2H19c2 0 2-2 2-2V7c0-2-2-2-2-2H5z" fillRule="evenodd"></path></svg></span>
							<span className="editor-btn"><svg className="edit-svg" fill="currentColor" viewBox="0 0 26 26" width="24" height="24"><path d="M9.033 16.182l3.083-4.133a.885.885 0 0 0 .003-1.12L9.033 6.817h7.985c.606-.03.982-.362.982-.92C18 5.34 17.611 5 17.018 5H6.922a.93.93 0 0 0-.83.509.882.882 0 0 0 .109.946L10 11.5l-3.782 5.037c-.29.289-.246.743-.122.974.172.316.455.489.799.489v-.211l.029.21h10.094c.501 0 .982-.32.982-.909 0-.59-.483-.857-.982-.908H9.033z" fillRule="evenodd"></path></svg></span>
							<span className="editor-btn"><svg className="edit-svg" fill="currentColor" viewBox="0 0 26 26" width="24" height="24"><path d="M4 7c0-.552.445-1 1-1h14c.552 0 1 .444 1 1 0 .552-.445 1-1 1H5c-.552 0-1-.444-1-1zm0 5a1 1 0 0 1 1.01-1h1.98a1 1 0 1 1 0 2H5.01C4.451 13 4 12.556 4 12zm6 0a1 1 0 0 1 1.01-1h1.98a1 1 0 1 1 0 2h-1.98c-.558 0-1.01-.444-1.01-1zm6 0a1 1 0 0 1 1.01-1h1.98a1 1 0 1 1 0 2h-1.98c-.558 0-1.01-.444-1.01-1zM4 17c0-.552.445-1 1-1h14c.552 0 1 .444 1 1 0 .552-.445 1-1 1H5c-.552 0-1-.444-1-1z" fillRule="evenodd"></path></svg></span>
							<span className="editor-btn"><svg className="edit-svg" fill="currentColor" viewBox="0 0 26 26" width="24" height="24"><path d="M9.864 12.83l1.641 1.642-1.171 2.874a1.693 1.693 0 0 1-1.585 1.055.782.782 0 0 1-.716-1.077l1.83-4.494zM11.5 8.811L12.24 7H9.69l-2-2h10.672a1 1 0 1 1 0 2h-3.813l-1.406 3.452L11.5 8.811zM5.293 6.845a1 1 0 0 1 1.414 0l10.046 10.046a1 1 0 0 1-1.414 1.414L5.293 8.26a1 1 0 0 1 0-1.415z" fillRule="evenodd"></path></svg></span>
						</div>
					</div>
					<div className="editor" id="cccc">

					</div>
				</div>
			</div>
        );
    }

}
