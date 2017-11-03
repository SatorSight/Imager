class ImagesController < ApplicationController
  http_basic_authenticate_with name: "n", password: "ice"

  def index
	@image = Image.new
	@all_images = Image.order(id: :desc).page params[:page]
  end

  def create
  	@image = Image.new upload_params
  	if @image.save 
  		render json: { message: "success", uploadId: @image.id }, status: 200
  	else
  		render json: { error: @image.errors.full_messages.join(", ") }, status: 400
  	end
  end

  def destroy
  	@image = Image.find params[:id]
  	@image.destroy
  end

  def short
  	@image = Image.find params[:id]
  	#image = Rails.root.to_s+'/public'+@image.image_file.url(:original, timestamp: false)
    @images_before = Image.where("id < ?", @image.id)
    @images_after = Image.where("id > ?", @image.id)
    
  	#send_file image, disposition: 'inline'
  end

private

  def upload_params
  	params.require(:image).permit :image_file
  end	

end