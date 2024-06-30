Jekyll::Hooks.register :site, :post_write do |site|
  puts "Building Tailwind CSS"
  system "yarn run build"
end
