module ImagesHelper
	def image_path(image)
		#Rails.root.to_s+'/public'+image.image_file.url(:original, timestamp: false)
		image.image_file.url(:original, timestamp: false)
	end
end