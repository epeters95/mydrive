CarrierWave.configure do |config|
  # Use local storage in development and test
  if Rails.env.development? || Rails.env.test?
    config.storage = :file
  end

  # Use AWS S3 in production
  if Rails.env.production?
    config.storage = :fog
    config.fog_provider = 'fog/aws'
    config.fog_credentials = {
      provider: 'AWS',
      aws_access_key_id: ENV['S3_KEY'],
      aws_secret_access_key: ENV['S3_SECRET'],
      region: ENV['us-east-1'] # optional
    }
    config.fog_directory = ENV['S3_BUCKET']
    config.fog_public = false
  end
end