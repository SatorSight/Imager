module ImagesHelper
	def image_path(image)
		#Rails.root.to_s+'/public'+image.image_file.url(:original, timestamp: false)
		image.image_file.url(:original, timestamp: false)
	end

	def image_width(image)
		i = image.image_file
		geometry = Paperclip::Geometry.from_file(i)
		width = geometry.width.to_s << 'px'
		width.slice! '.0'
		width
	end

	def all_tags
		Tag.all
	end
end