from django.db import migrations

class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_add_terms_accepted_at'),
    ]

    operations = [
        migrations.RunSQL(
            sql="ALTER TABLE users_customuser DROP COLUMN username;",
            reverse_sql="ALTER TABLE users_customuser ADD COLUMN username VARCHAR(150) NOT NULL;"
        ),
    ]
