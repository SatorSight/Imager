class ImagesController < ApplicationController
  
  def index
  	@image = Image.new
  	@all_images = Image.order(id: :desc).page params[:page]
  end

  def create
  	@image = Image.new upload_params
    add_tags_for @image
  	if @image.save 
  		render json: { message: "success", uploadId: @image.id }, status: 200
  	else
  		render json: { error: @image.errors.full_messages.join(", ") }, status: 400
  	end
  end

  def destroy
  	@image = Image.find params[:id]
  	@image.destroy

    path = { controller: 'images', action: 'index' }
    redirect_to path
  end

  def short
  	@image = Image.find params[:id]
    @images_before = Image.where("id < ?", @image.id)
    @images_after = Image.where("id > ?", @image.id)
    render :layout => false
  end

  def raw
    @image = Image.find params[:id]
    image = Rails.root.to_s+'/public'+@image.image_file.url(:original, timestamp: false)
    send_file image, disposition: 'inline'
  end

  def tag
    @image = Image.new
    tag = Tag.find_by title: params[:tag]
    @all_images = tag.images.order(id: :desc).page params[:page]
    render :index
  end

  def filter

    from = nil
    to = nil
    unless params[:daterange].blank?
      from = params[:daterange][0, params[:daterange].index(' ')]
      to = params[:daterange]
      to.slice! from
      to.slice! '-'
      to.strip!
    end

    @image = Image.new

    if from.present? or to.present?
      if from.present? and to.empty?
        @all_images = Image.where('created_at > ?', from).order(id: :desc).page params[:page]
      end
      if from.empty? and to.present?
        @all_images = Image.where('created_at < ?', to).order(id: :desc).page params[:page]
      end
      if from.present? and to.present?
        @all_images = Image.where('created_at > ?', from).where('created_at < ?', to).order(id: :desc).page params[:page]
      end

    else
      @all_images = Image.order(id: :desc).page params[:page]

    end

    render 'index'
  end

private

  def upload_params
  	params.require(:image).permit :image_file
  end	

  def add_tags_for(image)
    name = image.image_file_file_name.dup
    name.slice! '.jpg'
    name.slice! '.png'
    name.slice! '.jpeg'
    name.slice! '.gif'
    name.slice! ' '

    tag_strings = []

    name_parts = name.split '_'
    name_parts.each do |part|
      part.slice! '-'
      part.slice! '.'

      part.downcase!

      tag_strings.push part unless part =~ /\d/
    end

    tag_strings.each do |tag_string|

      t = Tag.find_by title: tag_string
      if !t
        tag = Tag.new
        tag.title = tag_string
        tag.save
      else
        tag = t
      end
      image.tags << tag unless image.tags.include? tag
      image.save

    end
  end

end