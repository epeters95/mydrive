class Photo extends React.Component {
  render() {
    return <div class="p-2 albums_image">
             <p class="img_name" title={this.props.name}>
               {this.props.name}
             </p>
             <img src={this.props.image_url} alt={this.props.description}/>
           </div>
  }
}