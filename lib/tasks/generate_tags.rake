desc 'generate tags for all images'
task :generate_tags => :environment do
  Rails.logger.level = Logger::DEBUG

  Image.all.each do |image|

    name = image.image_file_file_name
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