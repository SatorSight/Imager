desc 'fix images extensions'
task :fix_images => :environment do
  Rails.logger.level = Logger::DEBUG

  Image.all.each do |image|
    name = image.image_file_file_name
    if !name.include? '.jpg' and 
       !name.include? '.png' and 
       !name.include? '.jpeg' and 
       !name.include? '.gif'

       if image.image_file_content_type.include? 'jpeg'
         name << '.jpg'
       end

       if image.image_file_content_type.include? 'png'
         name << '.png'
       end   

       if image.image_file_content_type.include? 'gif'
         name << '.gif'
       end      

       image.save
    end
  end
end